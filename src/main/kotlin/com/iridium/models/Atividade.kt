import kotlinx.serialization.Serializable
import kotlinx.serialization.Contextual
import java.time.LocalDate

enum class Tipo {
    Tarefa, Prova
}

@Serializable
data class Atividade(
    var name: String,
    var descricao: String,
    var tipo: Tipo,
    var concluido: Boolean,
    var disciplina: String,
    @Contextual
    var prazo: LocalDate,
)