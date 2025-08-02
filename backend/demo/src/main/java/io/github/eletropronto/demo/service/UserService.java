package io.github.eletropronto.demo.service;
import io.github.eletropronto.demo.model.User;
import io.github.eletropronto.demo.repository.UserRepository;
import io.github.eletropronto.demo.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserValidator validator;

    public Optional<User> findById(Long id){
        return repository.findById(id);
    }

    public User save(User user){
        validator.validate(user);
        return repository.save(user);
    }
    public User updateUser(User user){
        if(user.getId() == null){
            throw new IllegalArgumentException("No User found.");
        }
        validator.validate(user);
        return repository.save(user);
    }
    public void deleteUser(User user){
        repository.delete(user);
    }
}
