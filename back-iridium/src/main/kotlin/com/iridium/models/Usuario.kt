import kotlinx.serialization.Serializable
import kotlinx.serialization.Contextual

@Serializable
data class Usuario(
    var id: Int? = null,
    var nome: String,
    var email: String,
    var senha: String,
)