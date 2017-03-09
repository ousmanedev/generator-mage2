<?php
namespace <%= moduleNamespace %>\Model;

class <%= modelName %> extends \Magento\Framework\Model\AbstractModel implements <%= modelName %>Interface, \Magento\Framework\DataObject\IdentityInterface
{
    const CACHE_TAG = <%= modelPath %>;

    protected function _construct()
    {
        $this->_init('<%= moduleNamespace %>\Model\ResourceModel\<%= modelName %>');
    }

    public function getIdentities()
    {
        return [self::CACHE_TAG . '_' . $this->getId()];
    }
}
