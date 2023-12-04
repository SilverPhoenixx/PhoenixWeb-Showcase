import React, { useState, useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';

const TipTapEditor = ({content}) => {
    const editorContent = React.createRef();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Table.configure({
                HTMLAttributes: {
                    class: 'table table-striped-columns',
                },
            }),
            TableRow,
            TableHeader,
            TableCell,
            Link,
            TextStyle,
            Color,
            Image.configure({
                HTMLAttributes: {
                    class: 'renderImg',
                },
            }),
            Dropcursor,
        ],
        content: content,
        onUpdate() {
            editorContent.current.value = editor.getHTML();
        }
    });

    const [showHeading, setShowHeading] = useState(false);
    const [showTable, setShowTable] = useState(false);

    const handleToggleHeading = () => {
        setShowHeading(!showHeading);
    };

    const handleToggleTable = () => {
        setShowTable(!showTable);
    };

    const handleClick = (event) => {
        const headerToggle = document.getElementById('headerToggle');
        const headerList = document.getElementById('headerList');
        const tableToggle = document.getElementById('tableToggle');
        const tableList = document.getElementById('tableList');

        if (
            headerToggle === event.target ||
            (headerList !== null ? headerList === event.target : false) ||
            tableToggle === event.target ||
            (tableList !== null ? tableList === event.target : false)
        ) {
            return;
        }
        if (showHeading) {
            setShowHeading(false);
        }
        if (showTable) {
            setShowTable(false);
        }
    };


    return (
        <div onClick={handleClick}>
            <input id="tiptapContent" name="Content" type={"text"} hidden={true} ref={editorContent}/>
            <link rel="stylesheet" href="./css/tiptapeditor.css" />
            <div className="menu sticky-top">
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <i aria-hidden={true} className="fas fa-bold"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                >
                    <i aria-hidden={true} className="fas fa-paragraph"></i>
                </button>
                <button
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <i aria-hidden={true} className="fas fa-italic"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <i aria-hidden={true} className="fas fa-list"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <i aria-hidden={true} className="fas fa-list-ol"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                    <i aria-hidden={true} className="fas fa-code"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <i aria-hidden={true} className="fas fa-quote-right"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <b><s>─</s></b>
                </button>
                <input
                    className="btn btn-light"
                    type="color"
                    onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
                />
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => addImage()}
                >
                    <i aria-hidden={true} className="fa-solid fa-image"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <i aria-hidden={true} className="fa-solid fa-rotate-left"></i>
                </button>
                <button
                    className="btn btn-light"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <i aria-hidden={true} className="fa-solid fa-rotate-right"></i>
                </button>
                <div className="heading-options-container">
                    <button
                        type="button"
                        id="headerToggle"
                        className="btn btn-light"
                        onClick={handleToggleHeading}
                    >
                        Schriftgröße
                    </button>
                    <ul
                        style={{ display: showHeading ? 'block' : 'none' }}
                        id="headerList"
                        className="heading-buttons"
                    >
                        <li
                            className="btn btn-light"
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 1 }).run()
                            }
                        >
                            H1
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 2 }).run()
                            }
                        >
                            H2
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 3 }).run()
                            }
                        >
                            H3
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 4 }).run()
                            }
                        >
                            H4
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 5 }).run()
                            }
                        >
                            H5
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 6 }).run()
                            }
                        >
                            H6
                        </li>
                    </ul>
                </div>
                <div className="heading-options-container">
                    <button
                        type="button"
                        id="tableToggle"
                        className="btn btn-light"
                        onClick={handleToggleTable}
                    >
                        Tabellen Optionen
                    </button>
                    <ul
                        style={{ display: showTable ? 'block' : 'none' }}
                        id="tableList"
                        className="heading-buttons"
                    >
                        <li className="btn btn-secondary">Hinzufügen</li>
                        <li
                            className="btn btn-light"
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                                    .run()
                            }
                        >
                            Tabelle
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() => editor.chain().focus().addRowBefore().run()}
                        >
                            Reihe (Vor)
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() => editor.chain().focus().addRowAfter().run()}
                        >
                            Reihe (Danach)
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() => editor.chain().focus().addColumnBefore().run()}
                        >
                            Spalte (Vor)
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() => editor.chain().focus().addColumnAfter().run()}
                        >
                            Spalte (Danach)
                        </li>
                        <li className="btn btn-secondary">Entfernen</li>
                        <li
                            className="btn btn-light"
                            onClick={() => editor.chain().focus().deleteRow().run()}
                        >
                            Reihe entfernen
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                        >
                            Spalte entfernen
                        </li>
                        <li
                            className="btn btn-light"
                            onClick={() => editor.chain().focus().deleteTable().run()}
                        >
                            Tabelle entfernen
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-1 border rounded p-1">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TipTapEditor;
