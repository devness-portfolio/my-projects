package com.gentlescreen;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.health.contributor.Status;
import org.springframework.boot.health.registry.HealthContributorRegistry;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
class GentleScreenApplicationTests {

  @Autowired private HealthContributorRegistry healthContributorRegistry;

  @Test
  void applicationStartsWithHealthInfrastructure() {
    assertThat(healthContributorRegistry).isNotNull();
    assertThat(Status.UP.getCode()).isEqualTo("UP");
  }
}
