pipeline {
  agent any

  tools {
    nodejs 'node-24'
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
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
          sh 'npm run test:coverage'
        }
      }
    }

    stage('Relatório de Testes') {
      steps {
        junit allowEmptyResults: true, testResults: 'junit.xml'
        archiveArtifacts artifacts: 'coverage/**, junit.xml', fingerprint: true, allowEmptyArchive: true
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