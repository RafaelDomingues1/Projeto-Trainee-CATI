import type {DisciplinaDetails} from "../types/DisciplinaDetails.ts";

const mockDisciplinaDetails: Record<string, DisciplinaDetails> = {

    CAL101: {
        description: 'Introdução aos conceitos fundamentais do cálculo diferencial e integral, incluindo limites, derivadas e aplicações.',

        professor: 'Prof. Dr. Carlos Almeida',

        prerequisitos: []
    },

    CAL201: {
        description: 'Estudo de técnicas de integração, sequências, séries numéricas e aplicações do cálculo em várias variáveis.',

        professor: 'Profa. Dra. Mariana Souza',

        prerequisitos: [
            {
                code: 'CAL101',
                name: 'Cálculo 1',
                description: 'O aluno deve ter sido aprovado em Cálculo 1.'
            }
        ]
    },

    CAL301: {
        description: 'Estudo de funções de várias variáveis, derivadas parciais, integrais múltiplas e campos vetoriais.',

        professor: 'Prof. Dr. Eduardo Lima',

        prerequisitos: [
            {
                code: 'CAL201',
                name: 'Cálculo 2',
                description: 'O aluno deve ter sido aprovado em Cálculo 2.'
            }
        ]
    },

    FIS101: {
        description: 'Introdução à mecânica clássica, movimentos, forças, energia, trabalho e conservação do momento.',

        professor: 'Profa. Dra. Ana Ribeiro',

        prerequisitos: []
    },

    FIS201: {
        description: 'Continuação dos estudos de física, abordando oscilações, ondas, fluidos e termodinâmica.',

        professor: 'Prof. Dr. Roberto Mendes',

        prerequisitos: [
            {
                code: 'FIS101',
                name: 'Física 1',
                description: 'O aluno deve ter sido aprovado em Física 1.'
            }
        ]
    },

    COMP101: {
        description: 'Introdução à construção de algoritmos, lógica de programação, estruturas condicionais e estruturas de repetição.',

        professor: 'Prof. Dr. Marcelo Santos',

        prerequisitos: []
    },

    COMP102: {
        description: 'Estudo de estruturas de dados fundamentais, listas, pilhas, filas, árvores e análise de algoritmos.',

        professor:
            'Profa. Dra. Fernanda Costa',

        prerequisitos: [
            {
                code: 'COMP101',
                name: 'Construção de Algoritmos e Programação',
                description: 'O aluno deve possuir conhecimentos básicos de programação.'
            }
        ]
    },

    COMP201: {
        description: 'Estudo avançado de estruturas de dados, grafos, tabelas hash, algoritmos de busca e ordenação.',

        professor: 'Prof. Dr. Lucas Oliveira',

        prerequisitos: [
            {
                code: 'COMP102',
                name: 'Algoritmos e Estruturas de Dados',
                description: 'O aluno deve ter sido aprovado em Algoritmos e Estruturas de Dados.'
            }
        ]
    }
}

export default mockDisciplinaDetails