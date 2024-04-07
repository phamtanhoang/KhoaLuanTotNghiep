package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Collection;

public interface CollectionService {
    Collection create(Collection collection);
    Collection update(Collection collection);

}
