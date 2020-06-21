pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code..'
                git branch: 'dev_odefranca', credentialsId: 'git_ci_cd', url: 'https://github.com/insanidade/ppaldemos.git'
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