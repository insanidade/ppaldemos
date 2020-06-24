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
                sh label: '', script: 'docker container run -d --name from_jenkins -p 8081:3000 -v "$(pwd)"/tmp/node_modules:/home/ppdemos/node_modules insanidade/ppaldemosjenkins'
            }
        }        
    }
}