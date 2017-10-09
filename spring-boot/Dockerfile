FROM openjdk:8u141-jre

ADD target/spring-boot-0.0.1-SNAPSHOT.jar /opt/spring-boot-0.0.1-SNAPSHOT.jar

EXPOSE 8443

CMD ["java", "-jar", "/opt/spring-boot-0.0.1-SNAPSHOT.jar", "-Dspring.profiles.active=heroku"]
