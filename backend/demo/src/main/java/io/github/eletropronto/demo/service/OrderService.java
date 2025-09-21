package io.github.eletropronto.demo.service;
import io.github.eletropronto.demo.model.Order;
import io.github.eletropronto.demo.repository.OrderRepository;
import io.github.eletropronto.demo.validator.OrderValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final OrderValidator validator;

    public Optional<Order> findOrderById(Long id){
        return repository.getOrderById(id);
    }

    public Order save(Order order) {
        validator.validate(order);
        return repository.save(order);
    }

    public Order updateOrder(Order order){
         if(order.getId() == null) {
             throw new IllegalArgumentException("The Order doesn't exists or cannot be found. Please Try again later");
        }
         validator.validate(order);
         return repository.save(order);
    }


    public void deleteOrder(Order order) {
        repository.delete(order);
    }

}
