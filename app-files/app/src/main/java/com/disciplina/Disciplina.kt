package com.disciplina

import android.graphics.Color

class Disciplina{
    // lateinit permite que voce construa um objeto sem precisar inicizaliar a propriedade
    private lateinit var nome : String
    private lateinit var sigla : String
    private lateinit var docente: String
    private lateinit var apelido: String
    private lateinit var pagMoodle: String
    private lateinit var cor: Color

    constructor(
        nome: String,
        sigla: String,
        docente: String,
        apelido: String,
        pagMoodle: String,
        cor: Int
    ) {
        this.nome = nome
        this.sigla = sigla
        this.docente = docente
        this.apelido = apelido
        this.pagMoodle = pagMoodle
        this.cor = cor.toArgb()
    }

    fun setNome(nome: String) {
        this.nome = nome
    }

    fun getNome(): String {
        return this.nome
    }

    fun setSigla(sigla: String) {
        this.sigla = sigla
    }

    fun getSigla(): String {
        return this.sigla
    }

    fun setDocente(docente: String) {
        this.docente = docente
    }

    fun getDocente(): String {
        return this.docente
    }

    fun setApelido(apelido: String) {
        this.apelido = apelido
    }

    fun getApelido(): String {
        return this.apelido
    }

    fun setPagMoodle(pagMoodle: String) {
        this.pagMoodle = pagMoodle
    }

    fun getPagMoodle(): String {
        return this.pagMoodle
    }

    fun setCor(cor: Int) {
        this.cor = cor.toArgb()
    }

    fun getCor(): Color {
        return this.cor
    }
}
