package io.github.eletropronto.demo.controller;
import io.github.eletropronto.demo.controller.dto.ProductDTO;
import io.github.eletropronto.demo.controller.mapper.ProductMapper;
import io.github.eletropronto.demo.model.Product;
import io.github.eletropronto.demo.repository.ProductRepository;
import io.github.eletropronto.demo.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;
    private final ProductRepository repository;
    private final ProductMapper mapper;

    @GetMapping
    public List<Product> listAll(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> findDetails(@PathVariable Long id){
        return service.findById(id)
                .map(product -> {
                    ProductDTO dto = mapper.toDTO(product);;
                    return ResponseEntity.ok(dto);
                }).orElseGet( () -> ResponseEntity.notFound().build());

    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid ProductDTO dto){
        Product objProduct = mapper.toEntity(dto);
        service.save(objProduct);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(objProduct.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto){
        Optional<Product> foundedProduct = service.findById(id);

        if(foundedProduct.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Product product = foundedProduct.get();
        product.setNameProduct(dto.nameProduct());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        service.update(product);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProdcut(@PathVariable Long id){
        Optional<Product> foundedProduct = service.findById(id);

        if(foundedProduct.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        service.delete(foundedProduct.get());
        return ResponseEntity.noContent().build();
    }


}
