FROM jenkins/jenkins:lts

ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
ENV CASC_JENKINS_CONFIG=/usr/share/jenkins/casc_configs/jenkins.yaml

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

USER root
RUN mkdir -p /usr/share/jenkins/casc_configs
COPY jenkins.yaml /usr/share/jenkins/casc_configs/jenkins.yaml
RUN chown -R jenkins:jenkins /usr/share/jenkins/casc_configs
USER jenkins