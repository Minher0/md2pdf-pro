'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import {
  FileText,
  Download,
  Upload,
  Moon,
  Sun,
  Type,
  FileImage,
  RotateCcw,
  Menu,
  X,
  Check,
  Loader2,
  Github,
  Code2,
  Eye,
  Settings2,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

// Types
type PageSize = 'a4' | 'letter'
type MarginSize = 'narrow' | 'standard' | 'wide'
type ThemeName = 'github' | 'medium' | 'latex'

interface PdfOptions {
  pageSize: PageSize
  marginSize: MarginSize
  fontSize: number
  theme: ThemeName
}

// Theme configurations
const themes: Record<ThemeName, { name: string; description: string }> = {
  github: { name: 'GitHub', description: 'Style moderne inspiré de GitHub' },
  medium: { name: 'Medium', description: 'Style éditorial élégant' },
  latex: { name: 'LaTeX', description: 'Style académique classique' }
}

// Page size configurations (in mm)
const pageSizes: Record<PageSize, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 }
}

// Margin configurations (in mm)
const marginSizes: Record<MarginSize, { top: number; right: number; bottom: number; left: number }> = {
  narrow: { top: 10, right: 10, bottom: 10, left: 10 },
  standard: { top: 25, right: 25, bottom: 25, left: 25 },
  wide: { top: 25, right: 50, bottom: 25, left: 50 }
}

// Sample markdown for demonstration
const sampleMarkdown = `# MD2PDF Pro - Guide d'utilisation

## Introduction

**MD2PDF Pro** est un outil moderne et performant pour convertir vos documents Markdown en PDF de haute qualité. Cette application offre une prévisualisation en temps réel et de nombreuses options de personnalisation.

## Fonctionnalités principales

### Éditeur intuitif

- **Prévisualisation en temps réel** : Visualisez instantanément le rendu de votre Markdown
- **Drag & Drop** : Glissez-déposez vos fichiers \`.md\` directement dans l'éditeur
- **Coloration syntaxique** : Code beautifiquement formaté avec Prism.js

### Options d'exportation

1. Choix du format de page (A4 ou Letter)
2. Ajustement des marges (Étroit, Standard, Large)
3. Taille de police personnalisable
4. Plusieurs thèmes de rendu

## Exemple de code

\`\`\`javascript
// Exemple de code JavaScript
function greet(name) {
  console.log(\`Bonjour, \${name}!\`);
}

greet('Monde');
\`\`\`

\`\`\`python
# Exemple de code Python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## Tableau comparatif

| Fonctionnalité | MD2PDF Pro | Concurrents |
|----------------|------------|-------------|
| Prévisualisation temps réel | ✅ | ❌ |
| Drag & Drop | ✅ | ❌ |
| Thèmes multiples | ✅ | ⚠️ |
| Export haute qualité | ✅ | ⚠️ |

## Bloc de citation

> "La simplicité est la sophistication ultime." — Léonard de Vinci

## Liste des tâches

- [x] Créer l'éditeur Markdown
- [x] Implémenter la prévisualisation
- [x] Ajouter l'export PDF
- [ ] Support d'autres formats

## Conclusion

MD2PDF Pro simplifie la création de documents professionnels à partir de Markdown. Essayez-le dès maintenant !

---

*Créé avec ❤️ par l'équipe MD2PDF Pro*
`

export default function Home() {
  const { toast } = useToast()
  const [markdown, setMarkdown] = useState<string>(sampleMarkdown)
  const [isExporting, setIsExporting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor')
  const [showOptions, setShowOptions] = useState(false)
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>({
    pageSize: 'a4',
    marginSize: 'standard',
    fontSize: 14,
    theme: 'github'
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name.endsWith('.md') || file.name.endsWith('.markdown')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          setMarkdown(content)
          toast({
            title: 'Fichier chargé',
            description: `${file.name} a été importé avec succès.`,
          })
        }
        reader.readAsText(file)
      } else {
        toast({
          title: 'Format non supporté',
          description: 'Veuillez déposer un fichier .md ou .markdown',
          variant: 'destructive'
        })
      }
    }
  }, [toast])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  // Handle file upload via button
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown'))) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setMarkdown(content)
        toast({
          title: 'Fichier chargé',
          description: `${file.name} a été importé avec succès.`,
        })
      }
      reader.readAsText(file)
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [toast])

  // Export to PDF
  const exportToPdf = useCallback(async () => {
    if (!previewRef.current) return
    
    setIsExporting(true)
    
    try {
      // Dynamically import html2pdf
      const html2pdf = (await import('html2pdf.js')).default
      
      // Clone the preview element for PDF export
      const element = previewRef.current.cloneNode(true) as HTMLElement
      element.classList.add('pdf-export')
      element.style.padding = '20px'
      element.style.fontSize = `${pdfOptions.fontSize}px`
      
      // Apply theme-specific styles
      if (pdfOptions.theme === 'latex') {
        element.style.fontFamily = 'Georgia, serif'
      } else if (pdfOptions.theme === 'medium') {
        element.style.fontFamily = 'Charter, Georgia, serif'
      }
      
      // Calculate margins
      const margins = marginSizes[pdfOptions.marginSize]
      
      const opt = {
        margin: [margins.top, margins.right, margins.bottom, margins.left],
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: pdfOptions.pageSize, 
          orientation: 'portrait' as const
        }
      }
      
      await html2pdf().set(opt).from(element).save()
      
      toast({
        title: 'PDF généré',
        description: 'Votre document a été exporté avec succès.',
      })
    } catch (error) {
      console.error('PDF export error:', error)
      toast({
        title: 'Erreur d\'exportation',
        description: 'Une erreur est survenue lors de la génération du PDF.',
        variant: 'destructive'
      })
    } finally {
      setIsExporting(false)
    }
  }, [pdfOptions, toast])

  // Clear editor
  const clearEditor = useCallback(() => {
    setMarkdown('')
    toast({
      title: 'Éditeur vidé',
      description: 'Le contenu a été effacé.',
    })
  }, [toast])

  // Reset to sample
  const resetToSample = useCallback(() => {
    setMarkdown(sampleMarkdown)
    toast({
      title: 'Contenu réinitialisé',
      description: 'L\'exemple a été restauré.',
    })
  }, [toast])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">MD2PDF Pro</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Markdown vers PDF</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme selector */}
            <Select
              value={pdfOptions.theme}
              onValueChange={(value: ThemeName) => 
                setPdfOptions(prev => ({ ...prev, theme: value }))
              }
            >
              <SelectTrigger className="w-[130px] hidden sm:flex">
                <Settings2 className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(themes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Export button */}
            <Button
              onClick={exportToPdf}
              disabled={isExporting || !markdown.trim()}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Télécharger PDF</span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </Button>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setShowOptions(!showOptions)}
            >
              {showOptions ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile options panel */}
        {showOptions && (
          <div className="lg:hidden border-t border-border p-4 bg-background">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Thème de rendu</Label>
                <Select
                  value={pdfOptions.theme}
                  onValueChange={(value: ThemeName) => 
                    setPdfOptions(prev => ({ ...prev, theme: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themes).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Options Bar */}
      <div className="border-b border-border bg-muted/30 hidden lg:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-6 flex-wrap">
            {/* Page size */}
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground whitespace-nowrap">Format:</Label>
              <Select
                value={pdfOptions.pageSize}
                onValueChange={(value: PageSize) => 
                  setPdfOptions(prev => ({ ...prev, pageSize: value }))
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Margins */}
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground whitespace-nowrap">Marges:</Label>
              <Select
                value={pdfOptions.marginSize}
                onValueChange={(value: MarginSize) => 
                  setPdfOptions(prev => ({ ...prev, marginSize: value }))
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="narrow">Étroit</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="wide">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Font size */}
            <div className="flex items-center gap-3">
              <Label className="text-sm text-muted-foreground whitespace-nowrap flex items-center gap-1">
                <Type className="w-4 h-4" />
                Police:
              </Label>
              <Slider
                value={[pdfOptions.fontSize]}
                onValueChange={([value]) => 
                  setPdfOptions(prev => ({ ...prev, fontSize: value }))
                }
                min={10}
                max={20}
                step={1}
                className="w-[120px]"
              />
              <span className="text-sm font-mono w-8">{pdfOptions.fontSize}px</span>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* File actions */}
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".md,.markdown"
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importer .md
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearEditor}
                disabled={!markdown.trim()}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Effacer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetToSample}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Exemple
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile file actions */}
      <div className="border-b border-border bg-muted/30 lg:hidden p-2 flex gap-2 justify-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".md,.markdown"
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-1" />
          Importer
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearEditor}
          disabled={!markdown.trim()}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Effacer
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetToSample}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Exemple
        </Button>
      </div>

      {/* Mobile view toggle */}
      <div className="lg:hidden border-b border-border">
        <Tabs value={mobileView} onValueChange={(v) => setMobileView(v as 'editor' | 'preview')}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Éditeur
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Prévisualisation
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor */}
        <div 
          className={`
            flex-1 flex flex-col overflow-hidden
            ${mobileView !== 'editor' ? 'hidden lg:flex' : ''}
          `}
        >
          <div className="flex-1 relative">
            <div
              className={`absolute inset-0 flex flex-col ${
                isDragging ? 'drop-zone drag-over border-2 border-dashed border-primary' : ''
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {isDragging && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                  <div className="flex flex-col items-center gap-2 text-primary">
                    <FileText className="w-12 h-12" />
                    <span className="text-lg font-medium">Déposez votre fichier .md ici</span>
                  </div>
                </div>
              )}
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Écrivez votre Markdown ici ou glissez-déposez un fichier .md..."
                className="editor-textarea flex-1 w-full p-6 bg-background border-0 resize-none focus:ring-0 focus:outline-none"
                style={{ fontSize: `${pdfOptions.fontSize}px` }}
              />
            </div>
          </div>
          {/* Status bar */}
          <div className="border-t border-border bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{markdown.length} caractères</span>
              <span>{markdown.split(/\s+/).filter(Boolean).length} mots</span>
              <span>{markdown.split('\n').length} lignes</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Markdown
            </Badge>
          </div>
        </div>

        {/* Divider */}
        <Separator orientation="vertical" className="hidden lg:block w-px bg-border" />

        {/* Preview */}
        <div 
          className={`
            flex-1 flex flex-col overflow-hidden bg-muted/20
            ${mobileView !== 'preview' ? 'hidden lg:flex' : ''}
          `}
        >
          <div className="flex-1 overflow-auto p-6" style={{ fontSize: `${pdfOptions.fontSize}px` }}>
            <div 
              ref={previewRef}
              className="markdown-preview max-w-none"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>MD2PDF Pro</span>
            <span>•</span>
            <span>Convertisseur Markdown vers PDF</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
