pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
        }
    }

    environment {
        IMAGE_NAME = "devops-app"
    }

    stages {

        stage('Checkout Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/kuldeeprana2012/devops-lab-ansible.git'
            }
        }

        stage('Use Existing Docker Image (Skip Build if Available)') {
            steps {
                sh '''
                if [ -z "$(docker images -q ${IMAGE_NAME}:latest)" ]; then
                    echo "⚙️ Image not found locally — building..."
                    docker build -t ${IMAGE_NAME}:latest .
                else
                    echo "✅ Using existing local image: ${IMAGE_NAME}:latest"
                fi
                '''
            }
        }

        stage('Save Docker Image') {
            steps {
                sh '''
                mkdir -p $WORKSPACE/jenkins_artifacts
                docker save ${IMAGE_NAME}:latest -o $WORKSPACE/jenkins_artifacts/${IMAGE_NAME}.tar
                echo "✅ Image saved at: $WORKSPACE/jenkins_artifacts/${IMAGE_NAME}.tar"
                '''
            }
        }

        stage('Deploy to Client via Ansible') {
            steps {
                sh '''
                echo "🚀 Deploying application with Ansible..."
                ansible-playbook ansible/deploy.yml --extra-vars "image_tar=$WORKSPACE/jenkins_artifacts/${IMAGE_NAME}.tar"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed. Check Jenkins logs.'
        }
    }
}
