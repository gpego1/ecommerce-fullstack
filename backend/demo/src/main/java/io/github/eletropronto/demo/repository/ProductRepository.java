package io.github.eletropronto.demo.repository;
import io.github.eletropronto.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByNameProductAndDescriptionAndPrice(String nameProduct, String description, Double price);
}
