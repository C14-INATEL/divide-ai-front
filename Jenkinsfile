pipeline {
  agent any

  tools {
    nodejs 'node-24'
  }

  environment {
    VERCEL_TOKEN = credentials('vercel-token')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Instalar dependências') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Testes Unitários') {
      steps {
        sh 'npm run test:coverage'
      }
    }

    stage('Relatório de Testes') {
      steps {
        junit 'test-results/junit.xml'
        archiveArtifacts artifacts: 'coverage/**, test-results/**', fingerprint: true
      }
    }
  }

  post {
    success {
      echo 'Deploy realizado com sucesso!'
    }
    failure {
      echo 'Algo deu errado no pipeline.'
    }
  }
}