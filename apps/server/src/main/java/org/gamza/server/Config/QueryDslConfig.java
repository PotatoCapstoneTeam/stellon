package org.gamza.server.Config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RequiredArgsConstructor
@Configuration
public class QueryDslConfig {

  private final EntityManager em;

  @PersistenceContext
  public JPAQueryFactory QueryDslConfig(EntityManager em) {
    return new JPAQueryFactory(em);
  }
}
