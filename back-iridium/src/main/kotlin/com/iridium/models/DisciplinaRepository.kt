package com.iridium.models

import Disciplina

interface DisciplinaRepository {
    suspend fun allDisciplinas(): List<Disciplina>
    suspend fun disciplinaByName(name: String): Disciplina?
    suspend fun disciplinasByAndamento(andamento: Boolean): List<Disciplina>
    suspend fun switchDisciplinaAndamento(name: String, andamento: Boolean ): Boolean
    suspend fun addDisciplina(disciplina: Disciplina)
    suspend fun removeDisciplina(name: String): Boolean

    // tentativas de alterar o bd
    suspend fun switchDisciplinaSigla(name: String, sigla: String): Boolean
    suspend fun switchDisciplinaDocente(name: String, docente: String): Boolean
    suspend fun switchDisciplinaApelido(name: String, apelido: String): Boolean
}
