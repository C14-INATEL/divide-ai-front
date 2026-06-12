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

    stage('Verificar Linter') {
      steps {
        sh 'npm run lint'
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
        archiveArtifacts artifacts: 'junit.xml', allowEmptyArchive: true
        recordCoverage(
          tools: [[parser: 'COBERTURA', pattern: 'coverage/cobertura-coverage.xml']],
          sourceCodeRetention: 'EVERY_BUILD'
        )
      }
    }

    stage('Deploy na vercel') {
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