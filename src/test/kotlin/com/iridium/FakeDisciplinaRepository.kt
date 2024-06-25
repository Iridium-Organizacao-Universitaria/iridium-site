package com.iridium

import Disciplina
import com.iridium.models.DisciplinaRepository

class FakeDisciplinaRepository : DisciplinaRepository {
    private val disciplinas = mutableListOf(
        Disciplina("sistemas", "dani"),
        Disciplina("desafios", "sesoko"),
        Disciplina("calculo", "zara"),
        Disciplina("labjef", "jef")
    )

    override suspend fun allDisciplinas(): List<Disciplina> = disciplinas

    override suspend fun disciplinaByName(name: String) = disciplinas.find {
        it.name.equals(name, ignoreCase = true)
    }

    override suspend fun addDisciplina(disciplina: Disciplina) {
        if (disciplinaByName(disciplina.name) != null) {
            throw IllegalStateException("Cannot duplicate disciplina names!")
        }
        disciplinas.add(disciplina)
    }

    override suspend fun removeDisciplina(name: String): Boolean {
        return disciplinas.removeIf { it.name == name }
    }
}