pipeline {
    agent any

    stages {
        stage('Build docker image') {
            steps {
                echo 'Building image (in SRV) according to Dockerfile..'
                sh label: '', script: 'docker image build -t insanidade/ppaldemosjenkins'
            }
        }
        stage('Build') {
            steps {
                echo 'Building by trigger AGAIN..'
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