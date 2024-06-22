package com.iridium.requests

import com.iridium.models.Disciplina
import kotlinx.serialization.Serializable
import java.util.UUID// para id random

//@Serializable
class DisciplinaRequest(
    val id: UUID,
    val nome: String,
    val sigla: String,
    val docente: String,
    val apelido: String,
    val emAndamento: Boolean
)

fun DisciplinaRequest.toDisciplina(
    id: UUID = UUID.randomUUID()
): Disciplina {
    return Disciplina(
        nome = this.nome,
        sigla = this.sigla,
        docente = this.docente,
        apelido = this.apelido,
        emAndamento = this.emAndamento
    )
}