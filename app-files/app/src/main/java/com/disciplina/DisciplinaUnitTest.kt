package com.disciplina

import android.graphics.Color
import org.junit.Test
import org.junit.Before
import org.junit.Assert.*

class DisciplinaUnitTest {

    // A variavel  inicializada posteriormente
    private lateinit var disciplina1 : Disciplina
    private lateinit var disciplina2 : Disciplina

    // A funcao roda antes dos testes
    @Before
    fun setUp(){
        disciplina1  = Disciplina("Introducao a computacao", "MAC0110", "Nina Hirata", "Introcomp", "https://edisciplinas.usp.br/course/view.php?id=97343", Color.YELLOW)
        disciplina2 = Disciplina("", "", "", "", "", Color.TRANSPARENT)
    }
    @Test
    // Testes get
    fun titulo_getisCorrect(){
        assertEquals(disciplina1.getNome(), "Introducao a computacao")
    }
    fun apelido_getisCorrect(){
        assertEquals(disciplina1.getApelido(), "Introcomp")
    }
    fun cor_getisCorrect(){
        assertEquals(disciplina1.getCor(), Color.YELLOW)
    }
    fun sigla_getisCorrect(){
        assertEquals(disciplina1.getSigla(), "MAC0110")
    }
    fun docente_getisCorrect(){
        assertEquals(disciplina1.getDocente(), "Nina Hirata")
    }
    fun pagMoodle_getisCorrect(){
        assertEquals(disciplina1.getPagMoodle(), "https://edisciplinas.usp.br/course/view.php?id=97343")
    }

    // Testes set
    fun titulo_setisCorrect(){
        disciplina2.setNome("Introducao ao Desenvolvimento de Sistemas de Software")
        assertEquals(disciplina2.getNome(), "Introducao ao Desenvolvimento de Sistemas de Software")
    }
    fun apelido_setisCorrect(){
        disciplina2.setApelido("LabMeirelles")
        assertEquals(disciplina2.getApelido(), "LabMeirelles")
    }
    fun cor_setisCorrect(){
        disciplina2.setCor(Color.CYAN)
        assertEquals(disciplina2.getCor(), Color.CYAN)
    }
    fun sigla_setisCorrect(){
        disciplina2.setSigla("MAC0350")
        assertEquals(disciplina2.getSigla(), "MAC0110")
    }
    fun docente_setisCorrect(){
        disciplina2.setDocente("Paulo Meirelles")
        assertEquals(disciplina2.getDocente(), "Paulo Meirelles")
    }
    fun pagMoodle_setisCorrect(){
        disciplina2.setPagMoodle("https://edisciplinas.usp.br/course/view.php?id=116557")
        assertEquals(disciplina2.getPagMoodle(), "https://edisciplinas.usp.br/course/view.php?id=116557")
    }
}