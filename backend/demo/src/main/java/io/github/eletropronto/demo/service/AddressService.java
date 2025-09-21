package io.github.eletropronto.demo.service;
import io.github.eletropronto.demo.model.Address;
import io.github.eletropronto.demo.repository.AddressRepository;
import io.github.eletropronto.demo.validator.AddressValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository repository;
    private final AddressValidator validator;

    public Optional<Address> findAddressById(Long id) {
        return repository.getAddressById(id);
    }

    public Address save(Address address) {
        validator.validate(address);
        return repository.save(address);
    }

    public Address updateAddress(Address address){
        if(address.getId() == null) {
            throw new IllegalArgumentException("The address doesn't exists");
        }
        validator.validate(address);
        return repository.save(address);
    }

    public void delete(Address address) {
        repository.delete(address);
    }
}
