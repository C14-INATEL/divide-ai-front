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
        archiveArtifacts artifacts: 'junit.xml, coverage/index.html', allowEmptyArchive: true
      }
    }

    stage('Deploy na vercel') {
      steps {
        sh '''
          npm install -g vercel
          vercel --token $VERCEL_TOKEN --yes --prod
        '''
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