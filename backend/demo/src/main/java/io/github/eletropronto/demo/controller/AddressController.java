package io.github.eletropronto.demo.controller;
import io.github.eletropronto.demo.controller.dto.AddressDTO;
import io.github.eletropronto.demo.controller.mapper.AddressMapper;
import io.github.eletropronto.demo.model.Address;
import io.github.eletropronto.demo.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService service;
    private final AddressMapper mapper;

    @GetMapping("/{id}")
    public ResponseEntity<Address> getAdressById(@PathVariable Long id) {
        Optional<Address> address = service.findAddressById(id);
        return address.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid AddressDTO dto) {
        Address addressObj = mapper.toEntity(dto);
        service.save(addressObj);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(addressObj.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody AddressDTO dto){
        Optional<Address> foundAddress = service.findAddressById(id);

        if(foundAddress.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Address address = new Address();
        address.setId(dto.id());
        address.setCode(dto.code());
        address.setState(dto.state());
        address.setCity(dto.city());
        address.setNumber(dto.number());
        service.updateAddress(address);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Address> foundAddress = service.findAddressById(id);

        if(foundAddress.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        service.delete(foundAddress.get());
        return ResponseEntity.noContent().build();
    }
}
