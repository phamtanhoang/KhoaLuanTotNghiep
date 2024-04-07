package com.pth.taskbackend.security;

import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> userDetail = repository.findByEmail(email);

        return userDetail.map(UserInfoDetails::of)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + email));
    }

    public String addUser(User userInfo) {
        userInfo.setEmail(userInfo.getEmail());
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return userInfo.getId();
    }


}