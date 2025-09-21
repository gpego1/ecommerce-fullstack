package io.github.eletropronto.demo.repository;
import io.github.eletropronto.demo.model.Order;
import io.github.eletropronto.demo.model.Product;
import io.github.eletropronto.demo.model.Status;
import io.github.eletropronto.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> getOrderById(Long id);
    Optional<Order> findByClientAndProductsAndStatus(User client, List<Product> products, Status status);
}
