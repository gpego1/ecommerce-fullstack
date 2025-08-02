package io.github.eletropronto.demo.service;
import io.github.eletropronto.demo.model.Product;
import io.github.eletropronto.demo.repository.ProductRepository;
import io.github.eletropronto.demo.validator.ProductValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final ProductValidator validator;

    public Optional<Product> findById(Long id){
        return repository.findById(id);
    }

    public Product save(Product product){
        validator.validate(product);
        return repository.save(product);
    }

    public Product update(Product product){
        if(product.getId() == null) {
            throw new IllegalArgumentException("The product doesnt exists");
        }
        validator.validate(product);
        return repository.save(product);
    }
    public void delete(Product product){
        repository.delete(product);
    }





}
