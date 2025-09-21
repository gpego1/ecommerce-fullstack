package io.github.eletropronto.demo.controller;
import io.github.eletropronto.demo.controller.dto.OrderDTO;
import io.github.eletropronto.demo.controller.mapper.OrderMapper;
import io.github.eletropronto.demo.model.Order;
import io.github.eletropronto.demo.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;
    private final OrderMapper mapper;

    @GetMapping
    public ResponseEntity<Order> getOrdersById(@PathVariable Long id) {
        Optional<Order> order = service.findOrderById(id);
        return order.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid OrderDTO dto){
        Order orderObj = mapper.toEntity(dto);
        service.save(orderObj);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(orderObj.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody OrderDTO dto){
        Optional<Order> foundedOrder = service.findOrderById(id);

        if(foundedOrder.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Order order = foundedOrder.get();
        order.setId(dto.id());
        order.setClient(dto.client());
        order.setProducts(dto.products());
        order.setStatus(dto.status());
        service.updateOrder(order);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<Order> foundedOrder = service.findOrderById(id);
        if(foundedOrder.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        service.deleteOrder(foundedOrder.get());
        return ResponseEntity.noContent().build();
    }
}
