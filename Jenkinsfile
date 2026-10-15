pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.63.0-noble'
      args '--ipc=host'
    }
  }

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  parameters {
    choice(name: 'TEST_SUITE', choices: ['all', 'ui', 'api', 'e2e'], description: 'Test group to execute')
    choice(name: 'TEST_ENV', choices: ['qa', 'staging', 'development'], description: 'Environment key in config/environment.json')
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Run tests') {
      steps {
        script {
          def commands = [
            all: 'npm test',
            ui: 'npm run test:ui',
            api: 'npm run test:api',
            e2e: 'npm run test:e2e'
          ]
          withEnv(["TEST_ENV=${params.TEST_ENV}", 'CI=true']) {
            sh commands[params.TEST_SUITE]
          }
        }
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: true, testResults: 'tests-results/junit.xml'
      archiveArtifacts allowEmptyArchive: true, artifacts: 'playwright-reports/**,tests-results/**'
    }
  }
}

