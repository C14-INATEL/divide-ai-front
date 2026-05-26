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

    stage('Deploy na Vercel') {
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