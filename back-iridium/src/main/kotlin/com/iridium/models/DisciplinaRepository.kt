package com.iridium.models

import Disciplina

interface DisciplinaRepository {
    suspend fun allDisciplinas(token: String): List<Disciplina>
    suspend fun disciplinaByName(name: String, token: String): Disciplina?
    suspend fun disciplinasByAndamento(andamento: Boolean, token: String): List<Disciplina>
    suspend fun switchDisciplinaAndamento(name: String, andamento: Boolean , token: String): Boolean
    suspend fun addDisciplina(disciplina: Disciplina, token: String)
    suspend fun removeDisciplina(name: String, token: String): Boolean
    suspend fun switchDisciplinaSigla(name: String, sigla: String, token: String): Boolean
    suspend fun switchDisciplinaDocente(name: String, docente: String, token: String): Boolean
    suspend fun switchDisciplinaApelido(name: String, apelido: String, token: String): Boolean
}
