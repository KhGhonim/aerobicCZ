"use client";

import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaStrikethrough,
  FaListUl, 
  FaListOl, 
  FaLink,
  FaUnlink,
  FaQuoteLeft,
  FaCode,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaArrowsAltV,
  FaUndo,
  FaRedo,
  FaEraser,
  FaPalette
} from 'react-icons/fa';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: 'small' | 'medium' | 'large' | 'extra-large';
  disabled?: boolean;
}

export interface RichTextEditorRef {
  captureCurrentContent: () => string;
}

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(({ 
  value, 
  onChange, 
  placeholder = "Start writing...", 
  className = "",
  height: initialHeight = 'medium',
  disabled = false
}, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [currentHeight, setCurrentHeight] = useState(initialHeight);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [currentFormat, setCurrentFormat] = useState('div');

  // Height configuration
  const heightClasses = {
    small: 'min-h-[120px] max-h-[200px]',
    medium: 'min-h-[200px] max-h-[400px]',
    large: 'min-h-[300px] max-h-[600px]',
    'extra-large': 'min-h-[400px] max-h-[800px]'
  };

  const heightOptions = [
    { value: 'small', label: 'Compact' },
    { value: 'medium', label: 'Standard' },
    { value: 'large', label: 'Extended' },
    { value: 'extra-large', label: 'Full' }
  ];

  // Clean HTML content by removing excessive whitespace and empty elements
  const cleanContent = useCallback((html: string): string => {
    if (!html || html.trim() === '') return '';
    
    let cleaned = html;
    
    // Remove only truly empty paragraphs and divs (preserve formatted elements)
    cleaned = cleaned.replace(/<(p|div)(\s[^>]*)?>(\s|&nbsp;)*<\/(p|div)>/gi, '');
    
    // Remove multiple consecutive line breaks (keep max 2)
    cleaned = cleaned.replace(/(<br\s*\/?>){3,}/gi, '<br><br>');
    
    // Remove leading and trailing whitespace from paragraphs and divs
    cleaned = cleaned.replace(/<(p|div)(\s[^>]*)?>\s+/gi, '<$1$2>');
    cleaned = cleaned.replace(/\s+<\/(p|div)>/gi, '</$1>');
    
    // Remove empty attributes
    cleaned = cleaned.replace(/\s(style|class)=""/g, '');
    
    // Ensure we don't return just whitespace
    const trimmed = cleaned.trim();
    return trimmed === '' ? '' : trimmed;
  }, []);

  // Sync content when value prop changes
  useEffect(() => {
    if (editorRef.current && value !== undefined && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const rawContent = editorRef.current.innerHTML;
      const content = cleanContent(rawContent);
      
      // Only call onChange if content is different
      if (content !== value) {
        onChange(content);
      }
    }
  }, [onChange, cleanContent, value]);

  const handleBlur = useCallback(() => {
    if (editorRef.current) {
      const rawContent = editorRef.current.innerHTML;
      const content = cleanContent(rawContent);
      
      if (content !== value) {
        onChange(content);
      }
    }
  }, [onChange, cleanContent, value]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setTimeout(() => {
        if (editorRef.current) {
          const rawContent = editorRef.current.innerHTML;
          const content = cleanContent(rawContent);
          
          if (content !== value) {
            onChange(content);
          }
        }
      }, 10);
    }
  }, [onChange, cleanContent, value]);

  // Enhanced execute command function
  const executeCommand = useCallback((command: string, value?: string) => {
    if (disabled) return;
    
    try {
      // Focus the editor first
      if (editorRef.current) {
        editorRef.current.focus();
      }

      // Special handling for different commands
      switch (command) {
        case 'insertUnorderedList':
        case 'insertOrderedList':
          document.execCommand(command, false, undefined);
          break;
        case 'formatBlock':
          if (value) {
            // Handle blockquote and pre differently
            if (value === 'blockquote' || value === 'pre') {
              document.execCommand('formatBlock', false, `<${value}>`);
            } else {
              document.execCommand('formatBlock', false, value);
            }
          }
          break;
        case 'foreColor':
          document.execCommand(command, false, value);
          break;
        default:
          document.execCommand(command, false, value);
      }
      
      // Update content after command execution
      setTimeout(() => {
        handleInput();
      }, 10);
      
    } catch (error) {
      console.warn('Command execution failed:', command, error);
    }
  }, [disabled, handleInput]);

  // Enhanced format block handler
  const handleFormatBlock = useCallback((format: string) => {
    if (disabled) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        try {
          if (format === 'blockquote') {
            // Special handling for blockquote
            executeCommand('formatBlock', 'blockquote');
          } else if (format === 'pre') {
            // Special handling for code blocks
            executeCommand('formatBlock', 'pre');
          } else {
            // Regular format blocks
            executeCommand('formatBlock', format);
          }
          setCurrentFormat(format);
        } catch (error) {
          console.warn('Format block failed:', error);
        }
      }
    }
  }, [disabled, executeCommand]);

  // Enhanced link creation
  const handleLinkCreation = useCallback(() => {
    if (disabled) return;
    
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
      setIsLinkDialogOpen(true);
    } else {
      const url = prompt('Enter URL:');
      if (url) {
        const text = prompt('Enter link text:') || url;
        const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        document.execCommand('insertHTML', false, linkHtml);
        handleInput();
      }
    }
  }, [disabled, handleInput]);

  const insertLink = useCallback(() => {
    if (linkUrl.trim()) {
      const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
      executeCommand('createLink', url);
      
      // Add target="_blank" to the created link
      setTimeout(() => {
        const links = editorRef.current?.querySelectorAll('a[href]:not([target])');
        links?.forEach(link => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        });
      }, 50);
    }
    setIsLinkDialogOpen(false);
    setLinkUrl('');
  }, [linkUrl, executeCommand]);

  const removeFormatting = useCallback(() => {
    executeCommand('removeFormat');
    executeCommand('unlink');
  }, [executeCommand]);

  // Enhanced toolbar sections with proper command handling
  const toolbarSections = [
    // Undo/Redo
    [
      { command: 'undo', icon: FaUndo, title: 'Undo' },
      { command: 'redo', icon: FaRedo, title: 'Redo' },
    ],
    // Text formatting
    [
      { command: 'bold', icon: FaBold, title: 'Bold (Ctrl+B)' },
      { command: 'italic', icon: FaItalic, title: 'Italic (Ctrl+I)' },
      { command: 'underline', icon: FaUnderline, title: 'Underline (Ctrl+U)' },
      { command: 'strikeThrough', icon: FaStrikethrough, title: 'Strikethrough' },
    ],
    // Lists and blocks
    [
      { command: 'insertUnorderedList', icon: FaListUl, title: 'Bullet List' },
      { command: 'insertOrderedList', icon: FaListOl, title: 'Numbered List' },
      { command: 'blockquote', icon: FaQuoteLeft, title: 'Quote', isFormatBlock: true },
      { command: 'pre', icon: FaCode, title: 'Code Block', isFormatBlock: true },
    ],
    // Alignment
    [
      { command: 'justifyLeft', icon: FaAlignLeft, title: 'Align Left' },
      { command: 'justifyCenter', icon: FaAlignCenter, title: 'Align Center' },
      { command: 'justifyRight', icon: FaAlignRight, title: 'Align Right' },
      { command: 'justifyFull', icon: FaAlignJustify, title: 'Justify' },
    ],
    // Links and cleanup
    [
      { command: 'createLink', icon: FaLink, title: 'Insert Link', custom: handleLinkCreation },
      { command: 'unlink', icon: FaUnlink, title: 'Remove Link' },
      { command: 'removeFormat', icon: FaEraser, title: 'Clear Formatting', custom: removeFormatting },
    ],
  ];

  const headingOptions = [
    { value: 'div', label: 'Normal Text' },
    { value: 'h1', label: 'Heading 1' },
    { value: 'h2', label: 'Heading 2' },
    { value: 'h3', label: 'Heading 3' },
    { value: 'h4', label: 'Heading 4' },
    { value: 'h5', label: 'Heading 5' },
    { value: 'h6', label: 'Heading 6' },
    { value: 'p', label: 'Paragraph' },
  ];

  const colorOptions = [
    { value: '#000000', name: 'Black' },
    { value: '#333333', name: 'Dark Gray' },
    { value: '#666666', name: 'Medium Gray' },
    { value: '#999999', name: 'Light Gray' },
    { value: '#cccccc', name: 'Very Light Gray' },
    { value: '#ff0000', name: 'Red' },
    { value: '#ff6600', name: 'Orange' },
    { value: '#ffcc00', name: 'Yellow' },
    { value: '#33cc33', name: 'Green' },
    { value: '#0099cc', name: 'Blue' },
    { value: '#6633cc', name: 'Purple' },
    { value: '#cc3399', name: 'Pink' },
    { value: '#ffffff', name: 'White' }
  ];

  // Function to manually capture current content
  const captureCurrentContent = useCallback(() => {
    if (editorRef.current) {
      const rawContent = editorRef.current.innerHTML;
      const content = cleanContent(rawContent);
      
      if (content !== value) {
        onChange(content);
      }
      return content;
    }
    return '';
  }, [onChange, cleanContent, value]);

  useImperativeHandle(ref, () => ({
    captureCurrentContent: captureCurrentContent,
  }));

  return (
    <div className={`rich-text-editor border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center">
        {/* Format Dropdown */}
        <select
          className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          onChange={(e) => handleFormatBlock(e.target.value)}
          value={currentFormat}
          disabled={disabled}
        >
          {headingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Text Color */}
        <div className="relative">
          <select
            className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
            onChange={(e) => executeCommand('foreColor', e.target.value)}
            defaultValue="#000000"
            disabled={disabled}
          >
            {colorOptions.map((color) => (
              <option key={color.value} value={color.value} style={{ color: color.value }}>
                {color.name}
              </option>
            ))}
          </select>
          <FaPalette className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Height Control */}
        <div className="flex items-center gap-1">
          <FaArrowsAltV className="w-3 h-3 text-gray-500" />
          <select
            className="px-2 py-1.5 border border-gray-300 rounded text-xs bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentHeight}
            onChange={(e) => setCurrentHeight(e.target.value as typeof currentHeight)}
            disabled={disabled}
          >
            {heightOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Toolbar Button Sections */}
        {toolbarSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex gap-1">
            {section.map((button, buttonIndex) => {
              const Icon = button.icon;
              return (
                <button
                  key={buttonIndex}
                  type="button"
                  className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-150 disabled:opacity-50"
                  onClick={() => {
                    if ('custom' in button && button.custom) {
                      button.custom();
                    } else if ('isFormatBlock' in button && button.isFormatBlock) {
                      handleFormatBlock(button.command);
                    } else {
                      executeCommand(button.command);
                    }
                  }}
                  title={button.title}
                  disabled={disabled}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
            {sectionIndex < toolbarSections.length - 1 && (
              <div className="w-px h-6 bg-gray-300 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${heightClasses[currentHeight]} p-4 focus:outline-none overflow-y-auto resize-none`}
        style={{ 
          lineHeight: '1.6',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
        spellCheck={true}
      />

      {/* Link Dialog */}
      {isLinkDialogOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected text: &quot;{selectedText}&quot;
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertLink}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          .rich-text-editor [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            font-style: italic;
            pointer-events: none;
          }
          
          .rich-text-editor [contenteditable] * {
            max-width: 100%;
          }
          
          .rich-text-editor [contenteditable] h1 {
            font-size: 2em !important;
            font-weight: 700 !important;
            line-height: 1.2 !important;
            margin: 0.5em 0 0.3em 0 !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] h2 {
            font-size: 1.5em !important;
            font-weight: 600 !important;
            line-height: 1.3 !important;
            margin: 0.4em 0 0.25em 0 !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] h3 {
            font-size: 1.25em !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin: 0.3em 0 0.2em 0 !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] h4 {
            font-size: 1.1em !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin: 0.25em 0 0.15em 0 !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] h5 {
            font-size: 1em !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin: 0.2em 0 0.1em 0 !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] h6 {
            font-size: 0.9em !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
            margin: 0.2em 0 0.1em 0 !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] p {
            margin: 0.5em 0 !important;
            line-height: 1.6 !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] p:first-child {
            margin-top: 0 !important;
          }
          
          .rich-text-editor [contenteditable] p:last-child {
            margin-bottom: 0 !important;
          }
          
          .rich-text-editor [contenteditable] blockquote {
            border-left: 4px solid #3b82f6 !important;
            padding-left: 1em !important;
            margin: 1em 0 !important;
            color: #4b5563 !important;
            font-style: italic !important;
            background-color: #f8fafc !important;
            padding: 0.5em 0 0.5em 1em !important;
            border-radius: 0 4px 4px 0 !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] pre {
            background-color: #f1f5f9 !important;
            border: 1px solid #e2e8f0 !important;
            padding: 1em !important;
            border-radius: 6px !important;
            overflow-x: auto !important;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
            font-size: 0.9em !important;
            line-height: 1.4 !important;
            margin: 1em 0 !important;
            white-space: pre-wrap !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] ul, 
          .rich-text-editor [contenteditable] ol {
            margin: 0.5em 0 !important;
            padding-left: 2em !important;
            display: block !important;
          }
          
          .rich-text-editor [contenteditable] ul {
            list-style-type: disc !important;
          }
          
          .rich-text-editor [contenteditable] ol {
            list-style-type: decimal !important;
          }
          
          .rich-text-editor [contenteditable] li {
            margin: 0.25em 0 !important;
            line-height: 1.5 !important;
            display: list-item !important;
          }
          
          .rich-text-editor [contenteditable] a {
            color: #3b82f6 !important;
            text-decoration: underline !important;
            transition: color 0.2s !important;
          }
          
          .rich-text-editor [contenteditable] a:hover {
            color: #1d4ed8 !important;
          }
          
          .rich-text-editor [contenteditable] strong, 
          .rich-text-editor [contenteditable] b {
            font-weight: 600 !important;
          }
          
          .rich-text-editor [contenteditable] em, 
          .rich-text-editor [contenteditable] i {
            font-style: italic !important;
          }
          
          .rich-text-editor [contenteditable] u {
            text-decoration: underline !important;
          }
          
          .rich-text-editor [contenteditable] s, 
          .rich-text-editor [contenteditable] strike {
            text-decoration: line-through !important;
          }
          
          .rich-text-editor [contenteditable]:focus {
            outline: none !important;
          }
          
          .rich-text-editor [contenteditable] p:empty {
            min-height: 1.2em !important;
          }
        `
      }} />
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;