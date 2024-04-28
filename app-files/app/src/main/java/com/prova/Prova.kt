package com.prova

package prova

import java.util.Date
class Prova(titulo: String, data: Date, descricao: String) {
    companion object {
        lateinit var Titulo: String
        lateinit var Data: Date
        lateinit var Descricao: String
    }

    init {
        this.Titulo = titulo
        this.Data = data
        this.Descricao = descricao
    }

    fun setTitulo(titulo: String) {
        this.Titulo = titulo
    }

    fun getTitulo(): String {
        return this.Titulo
    }

    fun setData(data: Date) {
        this.Data = data
    }

    fun getData(): Date {
        return this.Data
    }

    fun setDescricao(descricao: String) {
        this.Descricao = descricao
    }

    fun getDescricao(): String {
        return this.Descricao
    }
}
