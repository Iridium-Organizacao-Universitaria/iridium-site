import java.awt.Color

class Disciplinas {
    companion object {
        lateinit var Nome: String
        lateinit var Sigla: String
        lateinit var Docente: String
        lateinit var Apelido: String
        lateinit var Pag_Moodle: String
        lateinit var Cor: Color
    }

    constructor(Nome: String, Sigla: String, Docente: String, Apelido: String, Pag_Moodle: String, Cor: Color) {
        this.Nome = Nome
        this.Sigla = Sigla
        this.Docente = Docente
        this.Apelido = Apelido
        this.Pag_Moodle = Pag_Moodle
        this.Cor = Cor
    }

    fun setNome(Nome: String) {
        this.Nome = Nome
    }

    fun getNome(): String {
        return this.Nome
    }

    fun setSigla(Sigla: String) {
        this.Sigla = Sigla
    }

    fun getSigla(): String {
        return this.Sigla
    }

    fun setDocente(Docente: String) {
        this.Docente = Docente
    }

    fun getDocente(): String {
        return this.Docente
    }

    fun setApelido(Apelido: String) {
        this.Apelido = Apelido
    }

    fun getApelido(): String {
        return this.Apelido
    }

    fun setPag_Moodle(Pag_Moodle: String) {
        this.Pag_Moodle = Pag_Moodle
    }

    fun getPag_Moodle(): String {
        return this.Pag_Moodle
    }

    fun setCor(Cor: Color) {
        this.Cor = Cor
    }

    fun getCor(): Color {
        return this.Cor
    }
}

class Provas {
    companion object {
        lateinit var Titulo: String
        lateinit var Data: String //import java.util.Date - tem o tipo Date
        lateinit var Descricao: String

        class Provas {
            companion object {
                lateinit var Titulo: String
                lateinit var Data: String
                lateinit var Descricao: String
                lateinit var Data: Date
            }

            constructor(Titulo: String, Data: String, Descricao: String, Data: Date) {
                this.Titulo = Titulo
                this.Data = Data
                this.Descricao = Descricao
                this.Data = Data
            }

            // ... rest of the class code
        }
    }

    constructor(Titulo: String, Data: String, Descricao: String) {
        this.Titulo = Titulo
        this.Data = Data
        this.Descricao = Descricao
    }

    fun setTitulo(Titulo: String) {
        this.Titulo = Titulo
    }

    fun getTitulo(): String {
        return this.Titulo
    }

    fun setData(Data: String) {
        this.Data = Data
    }

    fun getData(): String {
        return this.Data
    }

    fun setDescricao(Descricao: String) {
        this.Descricao = Descricao
    }

    fun getDescricao(): String {
        return this.Descricao
    }
}

class Tarefas {
    companion object {
        lateinit var Titulo: String
        lateinit var Tipo_Tag: String
        lateinit var Prazo: String
        lateinit var Descricao: String
        lateinit var Status_Tag: String
    }

    constructor(Titulo: String, Tipo_Tag: String, Prazo: String, Status_Tag: String, Descricao: String) {
        this.Titulo = Titulo
        this.Tipo_Tag = Tipo_Tag
        this.Prazo = Prazo
        this.Descricao = Descricao
        this.Status_Tag = Status_Tag
    }

    fun setTitulo(Titulo: String) {
        this.Titulo = Titulo
    }

    fun getTitulo(): String {
        return this.Titulo
    }

    fun setTipo_Tag(Tipo_Tag: String) {
        this.Tipo_Tag = Tipo_Tag
    }

    fun getTipo_Tag(): String {
        return this.Tipo_Tag
    }

    fun setPrazo(Prazo: String) {
        this.Prazo = Prazo
    }

    fun getPrazo(): String {
        return this.Prazo
    }

    fun setDescricao(Descricao: String) {
        this.Descricao = Descricao
    }

    fun getDescricao(): String {
        return this.Descricao
    }

    fun setStatus_Tag(Status_Tag: String) {
        this.Status_Tag = Status_Tag
    }

    fun getStatus_Tag(): String {
        return this.Status_Tag
    }
}