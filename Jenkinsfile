pipeline {
    agent any

    environment {
        IMAGE_NAME   = 'devops-app'
        ARTIFACT_DIR = "${WORKSPACE}/jenkins_artifacts"
        ANSIBLE_DIR  = "${WORKSPACE}/ansible"
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
                    if [ -n "$(docker images -q ${IMAGE_NAME}:latest)" ]; then
                        echo "✅ Using existing local image: ${IMAGE_NAME}:latest"
                    else
                        echo "❌ Image not found, build it first!"
                        exit 1
                    fi
                '''
            }
        }

        stage('Save Docker Image') {
            steps {
                sh '''
                    mkdir -p ${ARTIFACT_DIR}
                    docker save ${IMAGE_NAME}:latest -o ${ARTIFACT_DIR}/${IMAGE_NAME}.tar
                    echo "✅ Image saved at: ${ARTIFACT_DIR}/${IMAGE_NAME}.tar"
                '''
            }
        }

        stage('Deploy to Client via Ansible') {
            steps {
                sh '''
                    echo "🚀 Deploying application with Ansible..."

                    # Run Ansible as the 'ansible' system user so it can access its SSH key
                    sudo -u ansible /usr/local/bin/ansible-playbook \
                        ${ANSIBLE_DIR}/deploy.yml \
                        --extra-vars "image_tar=${ARTIFACT_DIR}/${IMAGE_NAME}.tar"
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Deployment Failed. Check Jenkins logs."
        }
        success {
            echo "✅ Deployment Completed Successfully!"
        }
    }
}
