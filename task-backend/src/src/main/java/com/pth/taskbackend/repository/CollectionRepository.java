package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository  extends JpaRepository<Collection,String> {

}
