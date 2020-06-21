pipeline {
    agent any

    stages {
        stage('Build docker image') {
            steps {
                echo 'Building image (in SRV) according to Dockerfile..'
                sh label: '', script: 'docker image build -t insanidade/ppaldemosjenkins -f Dockerfile .'
            }
        }
        stage('Spinning container up') {
            steps {
                echo 'docker container run..'
                sh label: '', script: 'docker container run -d --name from_jenkins -p 8081:3000 insanidade/ppaldemosjenkins'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}