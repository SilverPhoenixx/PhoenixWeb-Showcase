<style>
div:focus {
  outline: none;
}
p {
  margin: 0;
}
.ProseMirror {
  min-height: 10em;
}
.heading-options-container {
  position: relative;
  display: inline-block;
}

.heading-buttons {
  list-style-type: none;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 5;
  white-space: nowrap;
  width: 100%;
}

.heading-buttons li, .heading-buttons button {
  display: block;
}

.renderImg {
  max-width: 50%;
}
</style>

<template>
  <div>
    <div class="menu sticky-top">
    <button type="button" class="btn btn-light" @click="editor.chain().focus().toggleBold().run()">
      <i class="fas fa-bold"></i>
    </button>
    <button type="button" class="btn btn-light" @click="editor.chain().focus().setParagraph().run()">
      <i class="fas fa-paragraph"></i>
    </button>
    <button class="btn btn-light" @click="editor.chain().focus().toggleItalic().run()">
      <i class="fas fa-italic"></i>
    </button>
    <button type="button" class="btn btn-light" @click="editor.chain().focus().toggleBulletList().run()">
      <i class="fas fa-list"></i>
    </button>
    <button type="button" class="btn btn-light" @click="editor.chain().focus().toggleOrderedList().run()">
      <i class="fas fa-list-ol"></i>
    </button>
    <button type="button" class="btn btn-light" @click="editor.chain().focus().toggleCodeBlock().run()">
      <i class="fas fa-code"></i>
    </button>
    <button type="button" class="btn btn-light" @click="editor.chain().focus().toggleBlockquote().run()">
      <i class="fas fa-quote-right"></i>
    </button>
    <button type="button" class="btn btn-light" @click="editor.chain().focus().setHorizontalRule().run()">
      <b><s>─</s></b>
    </button>
    <input
        class="btn btn-light"
        type="color"
        @input="editor.chain().focus().setColor($event.target.value).run()"
    >
    <button type="button" class="btn btn-light" @click="addImage">
      <i class="fa-solid fa-image"></i>
    </button>
    <button type="button" class="btn btn-light" @click="editor.chain().focus().undo().run()">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button class="btn btn-light" @click="editor.chain().focus().redo().run()">
      <i class="fa-solid fa-rotate-right"></i>
    </button>
    <div class="heading-options-container">
      <button type="button" id="headerToggle" class="btn btn-light" @click="toggleHeading">
        Schriftgröße
      </button>
      <ul v-if="showHeading" id="headerList" class="heading-buttons">
        <li class="btn btn-light" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
            H1
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            H2
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            H3
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
            H4
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
            H5
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
            H6
        </li>
      </ul>
    </div>
    <div class="heading-options-container">
      <button type="button"  id="tableToggle" class="btn btn-light" @click="toggleTable">
        Tabellen Optionen
      </button>
      <ul v-if="showTable"  id="tableList" class="heading-buttons">
        <li class="btn btn-secondary">
          Hinzufügen
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
          Tabelle
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().addRowBefore().run()">
          Reihe (Vor)
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().addRowAfter().run()">
          Reihe (Danach)
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().addColumnBefore().run()">
          Spalte (Vor)
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().addColumnAfter().run()">
          Spalte (Danach)
        </li>
        <li class="btn btn-secondary">
          Entfernen
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().deleteRow().run()">
          Reihe entfernen
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().deleteColumn().run()">
          Spalte entfernen
        </li>
        <li class="btn btn-light" @click="editor.chain().focus().deleteTable().run()">
          Tabelle entfernen
        </li>
      </ul>
    </div>
    </div>
    <editor-content class="mt-1 border rounded p-1" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link'
import Color  from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
export default {
  name: "TipTapEditor",
  components: {
    EditorContent,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      showHeading: false,
      showTable: false,
    }
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value
      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
      if (isSame) {
        return
      }
      this.editor.commands.setContent(value, false)
    },
  },
  methods: {
    toggleHeading() {
      this.showHeading = !this.showHeading;
    },
    toggleTable() {
      this.showTable = !this.showTable;
    },
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url, class: "child" }).run()
      }
    },
    onClick: function (event) {
      const headerToggle = document.getElementById("headerToggle");
      const headerList = document.getElementById("headerList");
      const tableToggle = document.getElementById("tableToggle");
      const tableList = document.getElementById("tableList");

      if (headerToggle === event.target
          || (headerList !== null ? headerList === event.target : false)
          || tableToggle === event.target
          || (tableList !== null ? tableList === event.target : false)) {
      return;
      }
      if (this.showHeading) this.toggleHeading();
      if (this.showTable) this.toggleTable();

    }
  },
  mounted() {
    this.$el.addEventListener('click', this.onClick)
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Table.configure({
          HTMLAttributes: {
            class: "table table-striped-columns",
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
            class: "renderImg"
          }
        }),
        Dropcursor
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())
        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>