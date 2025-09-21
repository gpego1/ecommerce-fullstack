package io.github.eletropronto.demo.validator;
import io.github.eletropronto.demo.model.Order;
import io.github.eletropronto.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class OrderValidator {

    @Autowired
    private OrderRepository repository;

    public OrderValidator(OrderRepository repository) {
        this.repository = repository;
    }

    public void validate(Order order){
        if(existsOrder(order)){
            throw new IllegalArgumentException("Duplicated Order entry");
        }
    }
    private boolean existsOrder(Order order){
        Optional<Order> foundedOrder = repository.findByClientAndProductsAndStatus(
                order.getClient(), order.getProducts(), order.getStatus()
        );
        if(order.getId() == null) {
            return foundedOrder.isPresent();
        }
        return !order.getId().equals(foundedOrder.get().getId()) && foundedOrder.isPresent();
    }
}
