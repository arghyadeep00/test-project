pipeline {
    agent any

    environment {
        IMAGE_NAME = 'node-api'
        CONTAINER_NAME = 'node-api'
        APP_PORT = '3000'

        DEPLOY_HOST = '13.234.175.255'
        DEPLOY_USER = 'ubuntu'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                        -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Save Docker Image') {
            steps {
                sh '''
                    docker save ${IMAGE_NAME}:${BUILD_NUMBER} \
                        -o node-api.tar
                '''
            }
        }

        stage('Transfer Image') {
            steps {
                sshagent(credentials: ['deploy-ssh-key']) {
                    sh '''
                        scp -o StrictHostKeyChecking=yes \
                            node-api.tar \
                            ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/node-api.tar
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sshagent(credentials: ['deploy-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=yes \
                            ${DEPLOY_USER}@${DEPLOY_HOST} \
                            "docker load -i /tmp/node-api.tar &&
                             docker rm -f ${CONTAINER_NAME} 2>/dev/null || true"

                        ssh -o StrictHostKeyChecking=yes \
                            ${DEPLOY_USER}@${DEPLOY_HOST} \
                            "docker run -d \
                             --name ${CONTAINER_NAME} \
                             --restart unless-stopped \
                             -p ${APP_PORT}:${APP_PORT} \
                             -e PORT=${APP_PORT} \
                             ${IMAGE_NAME}:${BUILD_NUMBER}"

                        ssh -o StrictHostKeyChecking=yes \
                            ${DEPLOY_USER}@${DEPLOY_HOST} \
                            "rm -f /tmp/node-api.tar"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Node.js API deployed successfully!'
        }

        failure {
            echo 'Deployment failed. Check the Jenkins console output.'
        }

        always {
            sh 'rm -f node-api.tar'
        }
    }
}