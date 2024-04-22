package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository  extends JpaRepository<Collection,String> {

}
