package io.github.eletropronto.demo.validator;
import io.github.eletropronto.demo.model.Product;
import io.github.eletropronto.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ProductValidator {

    @Autowired
    private ProductRepository repository;

    public ProductValidator(ProductRepository repository){
        this.repository = repository;
    }

    public void validate(Product product){
        if(existsProduct(product)){
            throw new IllegalArgumentException("Product already exists");
        }
    }
    private boolean existsProduct(Product product){
        Optional<Product> foundedProduct = repository.findByNameProductAndDescriptionAndPrice(
                product.getNameProduct(), product.getDescription(), product.getPrice()
        );
        if(foundedProduct.isEmpty()){
            return false;
        }

        if(product.getId() == null){
            return true;
        }
        return !product.getId().equals(foundedProduct.get().getId());
    }
}
