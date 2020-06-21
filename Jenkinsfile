pipeline {
    agent any

    stages {
        stage('Build image') {
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
        stage('Wait') {
            steps {
                echo 'Waiting..'
                sh label: '', script: 'sleep 5'
            }
        }
        stage('Stop container') {
            steps {
                echo 'Stoping container....'
                sh label: '', script: 'docker container stop from_jenkins'
            }
        }
        stage('Remove container') {
            steps {
                echo 'Removing container...'
                sh label: '', script: 'docker container rm from_jenkins'
            }
        }
        stage('Remove image') {
            steps {
                echo 'Removing image....'
                sh label: '', script: 'docker image rm insanidade/ppaldemosjenkins -f'                
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}