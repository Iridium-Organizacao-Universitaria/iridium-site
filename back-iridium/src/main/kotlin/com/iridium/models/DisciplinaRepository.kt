package com.iridium.models

import Disciplina

interface DisciplinaRepository {
    suspend fun allDisciplinas(): List<Disciplina>
    suspend fun disciplinaByName(name: String): Disciplina?
    suspend fun disciplinasByAndamento(emAndamento: Boolean): List<Disciplina>
    suspend fun addDisciplina(disciplina: Disciplina)
    suspend fun removeDisciplina(name: String): Boolean
}

