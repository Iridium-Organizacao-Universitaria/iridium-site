import kotlinx.serialization.Serializable

enum class Tipo {
    Tarefa, Prova
}

@Serializable
data class Atividade(
    var name: String,
    var descricao: String,
    var tipo: Tipo,
//    var prazo: String,
//    var disciplina: Disciplina,
    var concluido: Boolean
)