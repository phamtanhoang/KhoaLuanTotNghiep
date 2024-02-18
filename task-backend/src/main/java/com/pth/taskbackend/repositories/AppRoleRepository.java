package com.pth.taskbackend.repositories;

import com.pth.taskbackend.models.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppRoleRepository extends JpaRepository<AppRole, Long> {
    AppRole findByName(String name);

}
